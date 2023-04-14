import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputLabel, Input, TextareaAutosize } from '@mui/material';
import style from './therapistAddForm.module.scss';
import { SelectChangeEvent } from '@mui/material/Select';
import { CButton } from '@coreui/react';
import { addTherapistUser } from "../../services/service/therapist.service";

interface ITherapistDetails {
    name: string
    email: string,
    mobile: string
    education: string
    introduction: string
    picture: string
}

const TherapistAddForm = (props: any) => {
    const { setTherapist } = props;
    const [therapistDetails, settherapistDetails] = useState<ITherapistDetails>({
        name: "",
        email: "",
        mobile: "",
        education: "",
        introduction: "",
        picture: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const onSubmit = async () => {
        const res = addTherapistUser(therapistDetails)
        return res;
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.fieldWrapper}>
                    <InputLabel>Name</InputLabel>
                    <Input
                        type="text"
                        placeholder="Enter name"
                        fullWidth={true}
                        required={true}
                        value={therapistDetails.name}
                        {...register("name", {
                            required: "This is required field",
                            onChange: (event: SelectChangeEvent) => settherapistDetails(
                                {
                                    ...therapistDetails,
                                    name: event.target.value as string
                                }
                            )
                        })}
                    />
                    {errors.name ? (
                        <>
                            {errors.name.type === "required" && (
                                <p className={style.errMsg}>
                                    {errors.name.message as string}
                                </p>
                            )}
                        </>
                    ) : null}
                </div>
                <div className={style.fieldWrapper}>
                    <InputLabel>Email</InputLabel>
                    <Input
                        type="email"
                        placeholder="Enter Email"
                        fullWidth={true}
                        required={true}
                        value={therapistDetails.email}
                        {...register("email", {
                            required: 'This is required field',
                            onChange: (event: SelectChangeEvent) => settherapistDetails(
                                {
                                    ...therapistDetails,
                                    email: event.target.value as string
                                }
                            ),
                            pattern: {
                                value:
                                    /^[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/gm,
                                message: 'Enter valid email',
                            },
                        })}
                    />
                    {errors.email ? (
                        <>
                            {errors.email.type === "required" && (
                                <p className={style.errMsg}>
                                    {errors?.email?.message as string}
                                </p>
                            )}
                            {errors.email.type === "pattern" && (
                                <p className={style.errMsg}>
                                    {errors?.email?.message as string}
                                </p>
                            )}
                        </>
                    ) : null}
                </div>
                <div className={style.fieldWrapper}>
                    <InputLabel>Phone No.</InputLabel>
                    <Input
                        type="text"
                        placeholder="Enter phone number"
                        fullWidth={true}
                        required={true}
                        value={therapistDetails.mobile}
                        {...register("mobile", {
                            required: "This is required field",
                            onChange: (event: SelectChangeEvent) => settherapistDetails(
                                {
                                    ...therapistDetails,
                                    mobile: event.target.value as string
                                }
                            ),
                            pattern: {
                                value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                                message: "Please enter valid phone number",
                            },
                        })}
                    />
                    {errors.mobile ? (
                        <>
                            {errors.mobile.type === "required" && (
                                <p className={style.errMsg}>
                                    {errors.mobile.message as string}
                                </p>
                            )}
                            {errors.mobile.type === "pattern" && (
                                <p className={style.errMsg}>
                                    {errors.mobile.message as string}
                                </p>
                            )}
                        </>
                    ) : null}
                </div>
                <div className={style.fieldWrapper}>
                    <InputLabel>Education</InputLabel>
                    <Input
                        type="text"
                        placeholder="Enter Education/Designation"
                        fullWidth={true}
                        required={true}
                        value={therapistDetails.education}
                        {...register("education", {
                            required: "This is required field",
                            onChange: (event: SelectChangeEvent) => settherapistDetails(
                                {
                                    ...therapistDetails,
                                    education: event.target.value as string
                                }
                            )
                        })}
                    />
                    {errors.education ? (
                        <>
                            {errors.education.type === "required" && (
                                <p className={style.errMsg}>
                                    {errors.education.message as string}
                                </p>
                            )}
                        </>
                    ) : null}
                </div>
                <div className={style.fieldWrapper}>
                    <InputLabel>About Therapist</InputLabel>
                    <TextareaAutosize
                        minRows={4}
                        className={style.textField}
                        value={therapistDetails.introduction}
                        {...register("introduction", {
                            required: "This is required field",
                            onChange: (event: SelectChangeEvent) => settherapistDetails(
                                {
                                    ...therapistDetails,
                                    introduction: event.target.value as string
                                }
                            )
                        })}
                    />
                    {errors.introduction ? (
                        <>
                            {errors.introduction.type === "required" && (
                                <p className={style.errMsg}>
                                    {errors.introduction.message as string}
                                </p>
                            )}
                        </>
                    ) : null}
                </div>
                <div className={style.buttons}>
                    <CButton color="dark" onClick={() => setTherapist(false)} className="m-1">
                        Close
                    </CButton>
                    <CButton color="primary" type="submit" className="m-1">Submit</CButton>
                </div>
            </form>
        </>
    )
};

export default TherapistAddForm;