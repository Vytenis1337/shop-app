import { Form } from '../../components/contacts/Form';
import { SocialIcon } from '../../components/contacts/SocialIcon';
import { socialIcons } from '../../utilities/socialIcons';

import './Contacts.css';

export const Contacts = () => {
  return (
    <div className='contacts'>
      <div className='contacts-icons'>
        {socialIcons.map((item) => {
          return <SocialIcon key={item.id} {...item} />;
        })}
      </div>

      <Form />
    </div>
  );
};
