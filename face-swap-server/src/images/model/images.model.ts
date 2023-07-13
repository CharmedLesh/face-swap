import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ImageCreationAttrs {
    image: string;
}

@Table({ tableName: 'images' })
export class ImageModel extends Model<ImageModel, ImageCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    image: string;
}
