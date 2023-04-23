import { $msured, $salmon } from '../../assets/colors';
import { Field, Form, Formik } from 'formik';

import { css } from '@emotion/react';

interface Questions {
  alertType: 'weather' | 'brokenBus' | 'Other';
  delay: '5' | '10' | '15' | '30+';
  canceled: 'no' | 'yes';
  addText: string;
}
const Values: Questions = {
  alertType: 'weather',
  delay: '5',
  canceled: 'no',
  addText: '',
};

const styles = {
  text: css({
    fontSize: '1.5rem',
    fontFamily: 'Helvetica',
    fontWeight: 500,
    position: 'absolute',
    marginTop: '-2.5rem',
  }),
  dropDown: css({
    height: '2rem',
    width: '50rem',
    fontWeight: 700,
    fontSize: '1.2rem',
    borderRadius: '100px',
    border: '1px solid #D1190D',
    display: 'flex',
    alignContent: 'center',
    textAlignLast: 'center',
  }),
  textBox: css({
    height: '3rem',
    width: '30rem',
    fontSize: '1.2rem',
    padding: '0.5rem',
    borderRadius: '0.3rem',
    border: '1px solid #D1190D',
    // alignContent: 'center',
    textAlignLast: 'center',
  }),
};
const AlertForm = () => {
  const handleSubmit = (values: Questions) => {
    console.log('Submitting form data:', values);
    //connect api either here or in formiks
    setTimeout(() => {
      console.log('Form is done submitting');
    }, 1000);
  };
  return (
    <div>
      <Formik initialValues={Values} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div style={{ position: 'relative' }} className="d-flex justify-content-center">
              <label htmlFor="alertType" css={styles.text}>
                What type of alert is it?
              </label>
              <Field component="select" name="alertType" id="alertType" css={styles.dropDown}>
                <option value="weather">Weather</option>
                <option value="brokenBus">Broken Bus</option>
                <option value="Other">Other</option>
              </Field>
            </div>
            <div style={{ position: 'relative', marginTop: '3rem' }} className="d-flex justify-content-center">
              <label htmlFor="alertType" css={styles.text}>
                Est. delay time?
              </label>
              <Field component="select" name="delay" id="delay" css={styles.dropDown}>
                <option value="5">5 mins</option>
                <option value="10">10 mins</option>
                <option value="15">15 mins</option>
                <option value="30+">30+ mins</option>
              </Field>
            </div>
            <div style={{ position: 'relative', marginTop: '3rem' }} className="d-flex justify-content-center">
              <label htmlFor="alertType" css={styles.text}>
                Will there be a delay?
              </label>
              <Field component="select" name="canceled" id="canceled" css={styles.dropDown}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Field>
            </div>
            <div style={{ position: 'relative', marginTop: '3rem' }} className="d-flex justify-content-center">
              <label htmlFor="addText" css={styles.text}>
                Please add any other information(Max Length .200)
              </label>
              <Field
                type="text"
                name="addText"
                id="addText"
                placeholder="Add Text"
                css={styles.textBox}
                maxLength={100}
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '3vh' }}>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AlertForm;
