import { Model, PartitionKey, SortKey, Transient } from '@shiftcoders/dynamo-easy';

@Model({ tableName: 'TestTable' })
export class ExampleEntity {
    @PartitionKey()
    pk: string;

    @SortKey()
    sk: string;

    @Transient()
    id: number;

    @Transient()
    readonly sortKey: string;

    name: string;

    description: string;

    public constructor() {
        this.sortKey = 'sortkey';
    }

    public getSk(): string {
        return this.id ? `${this.sortKey}#${this.id}` : this.sortKey;
    }
}