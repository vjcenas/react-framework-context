import React, { useEffect, useState, useCallback, useRef } from 'react';
import EventManager from 'src/libraries/event.library';
import Lang from 'src/libraries/languages';
import styles from './toaster.module.scss';

export enum ToasterEvent {
  SHOW,
  CLEAR,
}

const eventManager = new EventManager<ToasterEvent>();

export enum ToasterType {
  SUCCESS,
  WARNING,
  ERROR,
  INFO,
}

type IToast = Record<string, any> & {
  type?: ToasterType;
};

const Toast = ({ type = ToasterType.ERROR, ...params }: IToast) => {
  eventManager.emit(ToasterEvent.SHOW, {
    ...params,
    type,
  });
};

type Formatted = number | string | JSX.Element;

const ToastSuccess = (content: Formatted | Formatted[]) => {
  eventManager.emit(ToasterEvent.SHOW, {
    type: ToasterType.SUCCESS,
    header: Lang.TTL_TOAST_SUCCESS,
    content,
  });
};

const ToastError = (content: Formatted | Formatted[]) => {
  eventManager.emit(ToasterEvent.SHOW, {
    type: ToasterType.ERROR,
    header: Lang.TTL_TOAST_ERROR,
    content,
  });
};

const ToastInfo = (content: Formatted | Formatted[]) => {
  eventManager.emit(ToasterEvent.SHOW, {
    type: ToasterType.INFO,
    header: Lang.TTL_TOAST_INFO,
    content,
  });
};

const ToastWarning = (content: Formatted | Formatted[]) => {
  eventManager.emit(ToasterEvent.SHOW, {
    type: ToasterType.WARNING,
    header: Lang.TTL_TOAST_WARNING,
    content,
  });
};

const ToastClear = () => {
  eventManager.emit(ToasterEvent.CLEAR);
};

export { Toast, ToastSuccess, ToastError, ToastInfo, ToastWarning, ToastClear };

type IToastList = {
  [k in string]: IToast;
};

export interface IProps {
  delay?: number;
}

const ToasterContainer: React.FC<IProps> = ({ delay = 5000 }) => {
  const outs = useRef({});
  const [toasts, setToasts] = useState<IToastList>({});
  const [shown, setShown] = useState<string[]>([]);
  const toastRef = useRef(toasts);
  // Always set the toastRef with the current values
  toastRef.current = toasts;

  const handleRemove = useCallback(
    (id) => {
      setToasts((values) => {
        const items = { ...values };

        delete items[id];

        return items;
      });
    },
    [setToasts]
  );

  // We will reset the timer for the toast that's being duplicated
  const handleTimer = useCallback(
    (id: string) => {
      if (outs.current[id]) {
        clearTimeout(outs.current[id]);
      }

      const timer = setTimeout(() => {
        handleRemove(id);
      }, delay);

      outs.current = { ...outs.current, [id]: timer };
    },
    [delay, handleRemove]
  );

  const handleEvent = useCallback(
    ({ id, ...value }) => {
      const key = id || `ID_${Math.random().toString(36).substr(2, 9)}`;

      if (!toastRef.current[key]) {
        setShown((val) => [...val, key]);
        setToasts((items) => ({ ...items, [key]: value }));
      } else {
        handleTimer(key);
      }
    },
    [setToasts, setShown, handleTimer]
  );

  // Listen to event changes
  useEffect(() => {
    eventManager.on(ToasterEvent.SHOW, handleEvent);
    eventManager.on(ToasterEvent.CLEAR, () => {
      setShown([]);
      setToasts({});
    });
  }, []);

  const handleMouseOver = useCallback((id: string) => {
    if (outs.current[id]) {
      clearTimeout(outs.current[id]);

      delete outs.current[id];
    }
  }, []);

  useEffect(() => {
    [...shown].forEach(handleTimer);

    // Always empty shown items
    if (shown.length) {
      setShown([]);
    }
  }, [shown, setShown, handleTimer]);

  return !Object.keys(toasts).length ? null : (
    <ul className={styles.container}>
      {Object.entries(toasts).map(([key, value]) => {
        const messageProps = { ...value } as any;

        if (value.type === ToasterType.ERROR) {
          messageProps.icon = 'times circle';
          messageProps.error = true;
        } else if (value.type === ToasterType.INFO) {
          messageProps.icon = 'question circle';
          messageProps.info = true;
        } else if (value.type === ToasterType.WARNING) {
          messageProps.icon = 'exclamation circle';
          messageProps.warning = true;
        } else if (value.type === ToasterType.SUCCESS) {
          messageProps.icon = 'check circle';
          messageProps.success = true;
        }

        return (
          <li
            key={`toast_${key}`}
            onMouseEnter={() => handleMouseOver(key)}
            onMouseLeave={() => handleTimer(key)}
          >
            <div
              {...messageProps}
              size="tiny"
              onDismiss={() => handleRemove(key)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ToasterContainer;
