interface ICreateQueueDTO {
  name: string;
  description?: string;
  host: string;
  port: number;
  groupId: string;
}

export default ICreateQueueDTO;
