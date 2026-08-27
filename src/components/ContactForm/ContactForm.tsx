import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import { PROFILE } from '@/data/site';
import { cn } from '@/utils/cn';

interface Fields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: '', email: '', subject: '', message: '' };

const FIELDS: {
  key: keyof Fields;
  index: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  placeholder: string;
  autoComplete?: string;
}[] = [
  { key: 'name', index: '01', label: 'Your Name', type: 'text', placeholder: 'Ada Lovelace', autoComplete: 'name' },
  { key: 'email', index: '02', label: 'Email', type: 'email', placeholder: 'you@domain.com', autoComplete: 'email' },
  { key: 'subject', index: '03', label: 'Subject', type: 'text', placeholder: 'Project enquiry' },
  { key: 'message', index: '04', label: 'Message', type: 'textarea', placeholder: 'Tell me about it…' },
];

const MAX_MESSAGE = 1200;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Required';
  if (!values.email.trim()) errors.email = 'Required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Invalid address';
  if (!values.subject.trim()) errors.subject = 'Required';
  if (!values.message.trim()) errors.message = 'Required';
  else if (values.message.length > MAX_MESSAGE) errors.message = 'Too long';
  return errors;
}

/**
 * A command interface, not a Bootstrap form: indexed prompts, underline rules
 * instead of boxes, and a blinking caret on the focused field.
 *
 * There is no backend here, so rather than faking a POST and lying about
 * delivery, submitting hands the composed message to the visitor's mail client.
 * To move to a real service, replace the body of `send` with a fetch to your
 * endpoint — nothing else in this component needs to change.
 */
export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [focused, setFocused] = useState<keyof Fields | null>(null);
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const body = `${values.message}\n\n—\n${values.name}\n${values.email}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      values.subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    setValues(EMPTY);
    window.setTimeout(() => setSent(false), 6000);
  };

  return (
    <form onSubmit={send} noValidate className="panel relative flex flex-col">
      {/* ---- Header rail ---- */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_1px] shadow-accent/50" />
          <span className="meta text-ink-dim">New message</span>
        </div>
        <span className="meta text-ink-faint">04 Fields</span>
      </div>

      <div className="flex flex-col gap-6 p-5 sm:gap-7 sm:p-6 lg:p-7">
        {FIELDS.map((field) => {
          const isFocused = focused === field.key;
          const error = errors[field.key];
          const value = values[field.key];

          return (
            <div key={field.key} className="relative">
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <label
                  htmlFor={`contact-${field.key}`}
                  className={cn(
                    'meta flex items-center gap-2 transition-colors duration-400',
                    error ? 'text-red-400' : isFocused ? 'text-accent-bright' : 'text-ink-mute',
                  )}
                >
                  <span className="text-ink-faint">{field.index}</span>
                  {field.label}
                </label>

                <AnimatePresence mode="wait">
                  {error ? (
                    <motion.span
                      key="err"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="meta text-red-400"
                    >
                      {error}
                    </motion.span>
                  ) : field.key === 'message' && value.length > 0 ? (
                    <motion.span
                      key="count"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="meta text-ink-faint"
                    >
                      {value.length}/{MAX_MESSAGE}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="relative flex items-start gap-2.5">
                {/* Prompt glyph */}
                <span
                  aria-hidden
                  className={cn(
                    'select-none pt-[0.35rem] font-mono text-xs transition-colors duration-400',
                    isFocused ? 'text-accent' : 'text-ink-faint',
                  )}
                >
                  &gt;
                </span>

                {field.type === 'textarea' ? (
                  <textarea
                    id={`contact-${field.key}`}
                    name={field.key}
                    rows={4}
                    value={value}
                    maxLength={MAX_MESSAGE}
                    placeholder={field.placeholder}
                    onChange={(e) => set(field.key, e.target.value)}
                    onFocus={() => setFocused(field.key)}
                    onBlur={() => setFocused(null)}
                    aria-invalid={!!error}
                    className="w-full resize-none bg-transparent pb-2 text-[0.9rem] leading-relaxed text-ink outline-none"
                  />
                ) : (
                  <input
                    id={`contact-${field.key}`}
                    name={field.key}
                    type={field.type}
                    value={value}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    onChange={(e) => set(field.key, e.target.value)}
                    onFocus={() => setFocused(field.key)}
                    onBlur={() => setFocused(null)}
                    aria-invalid={!!error}
                    className="w-full bg-transparent pb-2 text-[0.9rem] text-ink outline-none"
                  />
                )}

                {/* Caret sits at the end of an empty focused field */}
                {isFocused && !value && (
                  <span
                    aria-hidden
                    className="caret pointer-events-none absolute left-5 top-[0.15rem] h-[1.1rem] w-[1.5px] bg-accent"
                  />
                )}
              </div>

              {/* Underline: hairline at rest, accent sweeping in on focus */}
              <div className="relative h-px w-full bg-line">
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-0 origin-left bg-linear-to-r transition-transform duration-[600ms] [transition-timing-function:var(--ease-out-expo)]',
                    error ? 'from-red-400 to-red-400/20' : 'from-accent to-accent/20',
                    isFocused || error ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </div>
            </div>
          );
        })}

        {/* ---- Submit ---- */}
        <button
          type="submit"
          className={cn(
            'group/send relative mt-1 flex w-full items-center justify-center gap-2.5 overflow-hidden px-6 py-4',
            'border border-accent/60 bg-accent font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white',
            'transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]',
            'hover:border-accent-bright hover:shadow-[0_12px_44px_-14px_rgba(139,92,246,0.8)]',
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/18 to-transparent transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover/send:translate-x-full"
          />
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.span
                key="sent"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative flex items-center gap-2.5"
              >
                <Check className="size-[15px]" strokeWidth={2} />
                Handed to your mail app
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative flex items-center gap-2.5"
              >
                Send message
                <Send
                  className="size-[15px] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/send:translate-x-1 group-hover/send:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <p aria-live="polite" className="meta text-center text-ink-faint">
          {sent ? 'Draft opened in your default mail client' : 'Replies usually within a day'}
        </p>
      </div>
    </form>
  );
}
