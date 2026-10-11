import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const initialValues = { name: '', email: '', subject: '', message: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const recipientEmail = 'snehasingh79067@gmail.com';

function validateField(name, value) {
  const trimmedValue = value.trim();
  if (!trimmedValue) return 'This field is required.';

  if (name === 'email' && !emailPattern.test(trimmedValue)) {
    return 'Enter a valid email address.';
  }

  if (name === 'name' && trimmedValue.length > 100) {
    return 'Name must be 100 characters or fewer.';
  }

  if (name === 'subject' && trimmedValue.length > 120) {
    return 'Subject must be 120 characters or fewer.';
  }

  return '';
}

function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const submittingRef = useRef(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    setStatus({ type: '', message: '' });
    submittingRef.current = false;
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const fieldError = (name) => touched[name] ? validateField(name, values[name]) : '';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submittingRef.current) return;
    const form = event.currentTarget;

    const nextTouched = Object.fromEntries(Object.keys(initialValues).map((name) => [name, true]));
    setTouched(nextTouched);
    const firstInvalidField = Object.keys(initialValues).find((name) => validateField(name, values[name]));
    if (firstInvalidField) {
      setStatus({ type: 'error', message: 'Please check the highlighted fields and try again.' });
      form.elements.namedItem(firstInvalidField)?.focus();
      return;
    }

    submittingRef.current = true;
    try {
      const subject = values.subject.trim();
      const body = [
        `Name: ${values.name.trim()}`,
        `Email: ${values.email.trim()}`,
        '',
        'Message:',
        values.message.trim(),
      ].join('\n');
      const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setStatus({
        type: 'success',
        message: 'Your email app should open with your message prepared. Please press Send to send it.',
      });
      window.location.href = mailtoUrl;
    } catch {
      submittingRef.current = false;
      setStatus({
        type: 'error',
        message: 'Your email app could not be opened. Please email me directly using the address below.',
      });
    }
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name', maxLength: 100 },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email', maxLength: 254 },
    { name: 'subject', label: 'Subject', type: 'text', placeholder: 'What would you like to discuss?', maxLength: 120 },
  ];

  return (
    <form
      className="contact-form spotlight-card spotlight-tilt"
      id="contact-form"
      tabIndex="-1"
      data-reveal
      data-spotlight
      data-tilt="1.5"
      noValidate
      onSubmit={handleSubmit}
      aria-label="Contact form"
    >
      <div className="contact-form-fields">
        <div className="contact-form-grid">
          {fields.map(({ name, label, ...attributes }) => {
            const error = fieldError(name);
            const inputId = `contact-${name}`;
            const errorId = `${inputId}-error`;
            return (
              <div className={`form-field ${name === 'subject' ? 'form-field-wide' : ''}`} key={name}>
                <label htmlFor={inputId}>{label}<span aria-hidden="true"> *</span></label>
                <input
                  {...attributes}
                  id={inputId}
                  name={name}
                  value={values[name]}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {error && <span className="field-error" id={errorId}>{error}</span>}
              </div>
            );
          })}
          <div className="form-field form-field-wide">
            <label htmlFor="contact-message">Message<span aria-hidden="true"> *</span></label>
            <textarea
              id="contact-message"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell me a little about your idea..."
              rows="4"
              maxLength="1000"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldError('message'))}
              aria-describedby={fieldError('message') ? 'contact-message-error' : 'message-count'}
            />
            <div className="message-meta">
              {fieldError('message')
                ? <span className="field-error" id="contact-message-error">{fieldError('message')}</span>
                : <span />}
              <span id="message-count">{values.message.length}/1000</span>
            </div>
          </div>
        </div>
        <div className="form-submit-row">
          <button className="button button-primary contact-submit" type="submit">
            Send message <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <span className="form-required-note">* Required fields</span>
        </div>
        {status.message && (
          <p className={`form-status form-status-${status.type}`} role={status.type === 'error' ? 'alert' : 'status'} aria-live={status.type === 'error' ? 'assertive' : 'polite'}>
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
