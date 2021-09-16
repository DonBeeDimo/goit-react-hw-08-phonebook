import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PhonebookList from '../../components/ContactList';
import PhonebookForm from '../../components/PhonebookForm';
import Filter from '../../components/Filter';
import { contactsOperations } from '../../redux/contacts';
import s from './ContactsView.module.css';

export default function ContactsView() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  return (
    <div className={s.wrapper}>
      <h1>Phonebook</h1>
      <PhonebookForm />
      <h2>Contacts</h2>
      <Filter />
      <PhonebookList />
    </div>
  );
}
