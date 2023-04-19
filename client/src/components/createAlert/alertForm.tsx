import { Form, Formik } from 'formik';

interface Questions {
  alertType: 'weather' | 'brokenBus' | 'Other';
  delay: '5' | '10' | '20' | '30+';
  canceled: 'no' | 'yes';
  addtext: string;
}
const Values: Questions = {
  alertType: 'weather',
  delay: '5',
  canceled: 'no',
  addtext: '',
};

const AlertForm = () => {
  const handleSubmit = (values: any) => {
    //connect to api here
    console.log('form submitted', values);
  };
  return (
    <div>
      <Formik initialValues={{ Values }} onSubmit={handleSubmit}>
        <Form>
          <div></div>
        </Form>
      </Formik>
    </div>
  );
};

export default AlertForm;
