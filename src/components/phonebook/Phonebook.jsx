import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ContactForm from '../contactForm';
import Filter from '../filter';
import ContactList from '../contactList';
import {initialState} from "./initialState"

import styles from './Phonebook.module.css';

class Phonebook extends Component {

 state = {...initialState}

  addContact = (name, number) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      }
    });
  }

  handleChangeFilter = filter => {
    this.setState({filter});
  }

  getFilteredContacts = () => {
    const {contacts, filter} = this.state;
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  handleRemove = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({id}) => id !== contactId)
      }
    })
  }

  render() {
    const {contacts, filter} = this.state;
    return(
      <>
            <div className={styles.container}>
                <section title="Phonebook" className={styles.section}>
            <h1>Phonebook</h1>
            <ContactForm contacts={contacts} onAddContact={this.addContact}/>
          </section>
          <section title="Contacts" className={styles.section}>
            <h2>Contacts</h2>
            <Filter value={filter} onChangeFilter={this.handleChangeFilter}/>
            <ContactList filteredContacts={this.getFilteredContacts()} onRemove={this.handleRemove} />
          </section>
        </div>
      </>
    )
  }
}

export default Phonebook;