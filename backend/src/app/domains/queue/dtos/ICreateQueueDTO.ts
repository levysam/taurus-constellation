interface ICreateQueueDTO {
  name: string;
  description?: string;
  compliance?: string;
  host: string;
  port: number;
  groupId: string;
}

export default ICreateQueueDTO;
