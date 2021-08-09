import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { ADD_MEETING } from "../../utils/mutations";
import { MEETINGS, GET_ME } from "../../utils/queries";
// import { saveMeeting, getSavedMeeting } from "../../utils/localStorage";
import Auth from "../../utils/auth";

const AddEventForm = () => {
    const [formState, setFormState] = useState({
        meetingType: "",
        meetingTime: "",
        place: ""
    })
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
  
  const [addMeeting, { error }] = useMutation(ADD_MEETING, {
      update(cache, { data: { addMeeting } }) {
          try {
              const { meetings } = cache.readQuery({ query: MEETINGS });
              cache.writeQuery({
                  query: MEETINGS,
                  data: { meetings: [addMeeting, ...meetings] },
              })
          } catch (error) {
              console.log(error)
          }
          const { me } = cache.readQuery({ query: GET_ME });
          cache.writeQuery({
              query: GET_ME,
              data: { me: { ...me, meetings: [...me.meetings, addMeeting] } }
          })
      }
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value })
  }

  const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      try {
        await addMeeting({
          variables: { ...formState },
        })
      } catch (error) {
      console.log(error);
      }
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onclose={() => setShowAlert(false)} show={showAlert}>
          Something went wrong!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="meetingType">Event Type: </Form.Label>
          <Form.Control
            type="text"
            placeholder="What kind of event?"
            name="meetingType"
            onChange={handleInputChange}
            value={formState.meetingType}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="place">Location: </Form.Label>
          <Form.Control
            type="text"
            placeholder="What is the location?"
            name="place"
            onChange={handleInputChange}
            value={formState.place}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="meetingTime">Time: </Form.Label>
          <Form.Control
            type="text"
            placeholder="What is the event time"
            name="meetingTime"
            onChange={handleInputChange}
            value={formState.meetingTime}
            required
          />
        </Form.Group>
        <Modal.Footer>
          <Button
            // disabled={
            //   !(
            //     meetingType &&
            //     place &&
            //     meetingTime
            //   )
            // }
            type="submit"
          >
            Schedule
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default AddEventForm;
