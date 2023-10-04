import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';

class EmailButton extends React.Component {
  render() {
    return (
      <a href="mailto:example@example.com">
        <button className='email-button'><AiOutlineMail /></button>
      </a>
    );
  }
}

export default EmailButton;
