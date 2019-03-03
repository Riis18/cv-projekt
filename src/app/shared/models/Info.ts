import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;

export class Info {
  about: string;
  adress: string;
  birthday: Timestamp;
  email: string;
  language: string[];
  name: string;
  number: number;
  title: string;
  imageUrl: string;
}

