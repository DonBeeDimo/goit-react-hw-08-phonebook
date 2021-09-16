import { useState } from 'react';
import s from './PhonebookForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import LoaderComponent from '../LoaderComponent';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';

export default function PhonebookForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);
  const isLoading = useSelector(contactsSelectors.getLoading);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const checkRepeatName = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
  };

  const checkRepeatNumber = number => {
    return contacts.find(contact => contact.number === number);
  };

  const checkEmptyQuery = (name, number) => {
    return name.trim() === '' || number.trim() === '';
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (checkRepeatName(name)) {
      return toast(` ${name} is already in the phonebook.`);
    } else if (checkRepeatNumber(number)) {
      return toast(` ${number} is already in the phonebook.`);
    } else if (checkEmptyQuery(name, number)) {
      return toast.info("Enter the contact's name and number phone!");
    } else {
      dispatch(contactsOperations.addContact(name, number));
    }

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Ivan Ivanov"
        />
      </label>

      <label className={s.label}>
        Number
        <NumberFormat
          mask="_"
          pattern="^[0-9\s\(\)\-]{15}"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className={s.input}
          format="(###) ###-##-##"
          placeholder="Enter phone number"
        />
      </label>

      {!isLoading && (
        <Button
          type="submit"
          className={s.btn}
          variant="contained"
          color="secondary"
          size="large"
        >
          Add contact
        </Button>
      )}
      {isLoading && <LoaderComponent />}
    </form>
  );
}
