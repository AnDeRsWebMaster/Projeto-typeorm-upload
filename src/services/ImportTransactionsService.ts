import {getRepository, In} from 'typeorm'
import Category from '../models/Category'
import Transaction from '../models/Transaction'
import csvParse from 'csv-parse'
import fs from 'fs'

interface CSVTransaction{
  title: string,
  type: 'income' |'outcome',
  value: number,
  category: string
}
class ImportTransactionsService {
  async execute(filePath:string): Promise<Transaction[]> {
    const categRepo = getRepository(Category)
    const tranRepo = getRepository(Transaction)
    const contactsReadStream = fs.createReadStream(filePath)

    const parsers = csvParse({
     from_line:2
    })

    const parseCSV = contactsReadStream.pipe(parsers)

    const transactions: CSVTransaction[] = []
    const categories:string[] = []

    parseCSV.on('data', async line => {
      const [title,type,value,category] = line.map((cell:string) =>
        cell.trim()
      )

      if(!title || !type || !value || !category) return

      categories.push(category)
      transactions.push({title,type,value,category})
    })
    await new Promise(resolve => parseCSV.on('end',resolve))

    const existsCategories = await categRepo.find({
      where:{
        title: In(categories)
      }
    })

    const existentCategoriesTItle = existsCategories.map(
      (category:Category) => category.title
    )
      const addCategoryTitles = categories.filter(
        category => !existentCategoriesTItle.includes(category)
        ).filter((value,index,self) => self.indexOf(value) === index)

        const newCategories = categRepo.create(
          addCategoryTitles.map(title => ({
            title
          }))
        )
        await categRepo.save(newCategories)

        const finalCategories = [...newCategories,...existsCategories]

        const createdTransactions = tranRepo.create(
          transactions.map(transaction =>({
              title: transaction.title,
              type: transaction.type,
              value: transaction.value,
              category: finalCategories.find(
                category => category.title === transaction.category
              )
          }))
        )

        await tranRepo.save(createdTransactions)

        await fs.promises.unlink(filePath)

        return createdTransactions
  }

}

export default ImportTransactionsService;
