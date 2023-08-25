import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, OneToMany } from 'typeorm';
@Entity()
export class Notifications {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;
    
    @Column()
    message:string;

    @Column({nullable:true})
    link:string;

}