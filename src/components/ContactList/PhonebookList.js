import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';
import { motion, AnimatePresence } from 'framer-motion';
import { variants } from '../../utils/motionVar';
import s from './PhonebookList.module.css';
import { BsXSquareFill } from 'react-icons/bs';

export default function PhonebookList() {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(contactsSelectors.getVisibleContacts);
  const contacts = useSelector(contactsSelectors.getContacts);

  return (
    <>
      {contacts.length > 0 && (
        <motion.ul className={s.list}>
          <AnimatePresence>
            {visibleContacts.map(({ id, name, number }) => (
              <motion.li
                className={s.listItem}
                key={id}
                initial="initial"
                animate="animate"
                exit="exit"
                transition="transition"
                variants={variants}
              >
                <p className={s.info}>
                  <b>{name}</b>
                  <em>{number}</em>
                </p>
                <BsXSquareFill
                  color="red"
                  size="20px"
                  className={s.btn}
                  type="button"
                  onClick={() => dispatch(contactsOperations.deleteContact(id))}
                ></BsXSquareFill>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {!contacts.length && (
        <AnimatePresence>
          <motion.p
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
            variants={variants}
          >
            Your phonebook is empty. Please add contact.
          </motion.p>
        </AnimatePresence>
      )}
    </>
  );
}
