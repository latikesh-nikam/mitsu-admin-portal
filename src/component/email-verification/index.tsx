/* eslint-disable react-hooks/exhaustive-deps */
import React, { SyntheticEvent, useEffect, useState } from 'react';
import http from '../../services/module.service';
import Spinner from '../loading/spinner';
import styles from "./emailTemplate.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const EmailTemplate: React.FC = () => {
  const [token, setToken] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);;
  const [response, setResponse] = useState<{ status: number, message: string }>({
    status: 200,
    message: ""
  });

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const data = await http.patch(`users/verify/email?token=${token}`, {});
      if (data.statusCode === 200) {
        setResponse({ status: data.statusCode, message: data.message });
      }
      else {
        setResponse({ status: data.statusCode, message: data.message });
      }
    }

    catch (error: any) {
      setResponse({ status: 400, message: error?.message });
    }
    setLoading(false);
  };

  const onErrorImage = ({ currentTarget }: SyntheticEvent<HTMLImageElement, Event>): void => {
    currentTarget.onerror = null;
    currentTarget.src = "https://mitsu-assets.s3.ap-south-1.amazonaws.com/mitsu-text-logo.png";
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    const type = queryParameters.get("token");
    setToken(type);
    handleVerifyEmail();
  }, [token])

  return (
    <>
      <div className={styles.emailContainer}>
        {loading ?
          (<div className={styles.spinner}>
            <Spinner />
          </div>)
          :
          (
            <div className={styles.emailElements}>

              <div className={styles.img}>
                <img src="https://mitsu.care/wp-content/uploads/2022/10/Symbol_Blue_PNG.png" alt="mitsuLogo" className={styles.imgLogo}
                  onError={onErrorImage} />

                <div className={response.status === 200 ? styles.logo : styles.logoRed}>
                  {
                    response.status === 200 ?
                      <CheckIcon /> : <CloseIcon />
                  }
                </div>
              </div>

              <div className={styles.content}>
                <h1 className={styles.heading}>{response.message}</h1>
                {response.status === 200 ?
                  <span>You can close this tab now!!</span> : <span>
                    Please try again!!
                  </span>
                }
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default EmailTemplate