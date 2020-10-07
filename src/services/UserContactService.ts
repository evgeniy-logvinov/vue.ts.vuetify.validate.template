import UserEntity from '@/entities/UserEntity';
import UserContactEntity from '@/entities/UserContactEntity';
import { v4 as uuidv4 } from 'uuid';
import BaseApiService from './BaseApiService';

class UserContactService extends BaseApiService {
  public getSelfContacts(): Promise<UserContactEntity[]> {
    const RqUid = uuidv4();

    return this.http.get(`/contact?RqUid=${RqUid}`).then((x) => x.data.contacts);
  }

  public create(contact: UserContactEntity): Promise<string> {
    const RqUid = uuidv4();

    return this.http.post<UserContactEntity>(`/contact?RqUid=${RqUid}`, contact).then((x) => x.data.id);
  }

  public update(contact: UserContactEntity): Promise<string> {
    const RqUid = uuidv4();

    return this.http.put<UserContactEntity>(`/contact/${contact.id}?RqUid=${RqUid}`, contact).then((x) => x.data.id);
  }

  public async delete(contactId: string): Promise<void> {
    const RqUid = uuidv4();
    await this.http.delete<UserEntity>(`/contact/${contactId}?RqUid=${RqUid}`);
  }
}

export default new UserContactService();
