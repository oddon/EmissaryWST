import React from 'react';
import colors from '../../../colors';
import Card from '../../Overlay/Card';
import Input from '../../Input/TextInputBox';
import JumboRaisedButton from '../../Buttons/JumboRaisedButton';
import { toastr } from 'react-redux-toastr';

const AddAppointmentOverlay = ({
  isVisible,
  hideOverlay,
}) => {

  let firstname = '';
  let lastname = '';
  let phoneNumber = '';
  let providerName = '';
  let date = null;
  let time = null;


  return (
    <Card
      isVisible={isVisible}
      hideOverlay={hideOverlay}
    >
      <Input
        placeholder="First name"
        type="name"
        inputRef={(node) => {
          if (!node) return;
          firstname = node.value;
        }}
        onChange={(event) => {
          firstname = event.target.value;
        }}
      />
      <br />
      <Input
        placeholder="Last name"
        type="name"
      />
      <br />
      <Input
        placeholder="Phone number"
        type="phonenumber"
      />
      <br />
      <Input
        placeholder="Provider name"
        type="account"
      />
      <br />
      <Input
        placeholder="Date"
        type="date"
      />
      <br />
      <Input
        placeholder="Time"
        type="time"
      />
      <br />
      <JumboRaisedButton
        label="Add"
        backgroundColor={colors.green}
        labelColor="#fff"
        onTouchTap={async () => {

          if (!firstname) {
            toastr.error('First name required');
            return;
          }

          try {
            const payload = await create(
              firstname,
              lasntname,
              phoneNumber,
              date,
              companyId,
              providerName,
            );
            if (payload.error) {
              // do something
            }

          } catch (e) {
            toastr.error('Server error try again');
          }

        }}
      />
    </Card>
  );
}

export default AddAppointmentOverlay