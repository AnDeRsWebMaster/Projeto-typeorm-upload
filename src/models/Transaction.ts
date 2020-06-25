import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import Category from './Category'

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column()
  value: number;

  @ManyToOne(type => Category, category => category.id)
  @JoinColumn()
  category_id: Category;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
