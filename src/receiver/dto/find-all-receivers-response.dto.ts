import { Receiver } from '../entities/receiver.entity';

class Metadata {
    totalCount: number;
    totalPages: number;
    pageSize: number;
}

export class FindAllReceiversResponse {
    metadata: Metadata;
    data: Receiver[];
}
