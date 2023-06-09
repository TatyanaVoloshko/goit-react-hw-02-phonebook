import { Component } from 'react';
import css from './App.module.css';
import { Form } from './form/Form';
import { Contacts } from './contacts/Contacts';
import { Filter } from './filter/Filter';
import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  onDelete = id => {
    const contacts = [...this.state.contacts];
    const personToFind = id;
    const newContacts = contacts.filter(({ id }) => id !== personToFind);
    this.setState({
      contacts: newContacts,
    });
  };
  submitCathcer = ({ name, number }) => {
    const contacts = [...this.state.contacts];
    const nameToAdd = name;
    const newContact = {
      name: `${name}`,
      id: `${nanoid()}`,
      number: `${number}`,
    };
    const addCheck = contacts.find(({ name }) => name.toLowerCase() === nameToAdd.toLowerCase());
    if (!addCheck) {
      this.setState(prevState=>({contacts: [...prevState.contacts, newContact]}));
    } else {
      alert(`${nameToAdd} is already in contacts`);
    }
  };
  filteredNames() {
    const contacts = [...this.state.contacts];
    const filter = this.state.filter;
    const filtered = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered;
  }
  onFilter = e => {
    const nameIs = e.target.value;
    this.setState({ filter: nameIs });
  };

  render() {
    return (
      <div className={css.App}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.submitCathcer} />

        <h2>Contacts</h2>
        <Filter onFilter={this.onFilter} />
        <Contacts contacts={this.filteredNames()} onDelete={this.onDelete} />
      </div>
    );
  }
}
