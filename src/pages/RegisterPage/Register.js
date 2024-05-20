import "../../assets/css/style.scss";
import "../../assets/css/tStyle.scss";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import NotificationModal from "../../components/Modal/NotificationModal";
import { useState } from "react";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({ mode: "onChange" });
    const dispatch = useDispatch();

    const [modalOn, setModalOn] = useState(false);
    const [pwShow, setPwShow] = useState(false);
    const [pwShowConfirm, setPwShowConfirm] = useState(false);

    async function onSubmit({ email, name, password }) {
        const body = {
            email,
            name,
            password,
            image: `https://via.placeholder.com/600x400?text=no+user+image`,
        };

        dispatch(registerUser(body));
        setModalOn(true);
        // navigate("/login"); // 그리고 이미 있는 이메일 닉네임이면 회원가입 불가능 처리 해야됌
        reset();
    }

    const userEmail = {
        required: {
            value: true,
            message: "이메일은 필수 입니다.",
        },
        pattern: {
            value: /^\S+@\S+$/i,
            message: "이메일을 입력",
        },
    };
    const userName = {
        required: {
            value: true,
            message: "이름은 필수 입니다.",
        },
        maxLength: {
            value: 50,
            message: "최대 50자입니다.",
        },
    };
    const userPassword = {
        required: {
            value: true,
            message: "비밀번호는 필수 입니다.",
        },
        minLength: {
            value: 4,
            message: "최소 4자입니다.",
        },
    };

    return (
        <>
            <div
                className={`w-full h-full flex flex-col justify-center items-center`}
            >
                {modalOn && (
                    <NotificationModal
                        text="회원가입이 완료되었습니다!"
                        path="/login"
                    />
                )}
                <div
                    className="w-full h-full flex-col justify-start items-center inline-flex font-normal text-zinc-800"
                    style={{ fontFamily: "TTHakgyoansimMonggeulmonggeulR" }}
                >
                    <div className="text-center text-5xl">어까</div>
                    <div className="text-center text-3xl">가입 해볼까?</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="emailWrap flex justify-between mt-5 mb-5">
                            <div className="w-10 h-10 relative">
                                <div className="w-[35px] h-[35px] left-[7px] top-[2px] absolute">
                                    <img
                                        src="./images/iconMail.png"
                                        alt="email icon"
                                    />
                                </div>
                            </div>
                            <div style={{ fontFamily: "Pretendard-Regular" }}>
                                <input
                                    className="w-[351px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                    type="text"
                                    id="emailInput"
                                    name="emailInput"
                                    required
                                    placeholder="이메일을 입력하세요!"
                                    {...register("email", userEmail)}
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="usernameWrap flex justify-between mb-5">
                            <div className="w-10 h-10 relative">
                                <div className="w-[35px] h-[35px] left-[7px] top-[2px] absolute">
                                    <img
                                        src="./images/iconPerson.png"
                                        alt="person icon"
                                    />
                                </div>
                            </div>
                            <div style={{ fontFamily: "Pretendard-Regular" }}>
                                <input
                                    className="w-[351px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                    type="text"
                                    id="usernameInput"
                                    name="usernameInput"
                                    required
                                    maxLength="50"
                                    placeholder="닉네임을 입력하세요!"
                                    {...register("name", userName)}
                                />

                                {errors.name && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.name.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="passwordWrap flex justify-between mb-5">
                            <div className="w-10 h-10 relative">
                                <div className="w-[35px] h-[35px] left-[7px] top-[2px] absolute">
                                    <img
                                        src="./images/iconPwd.png"
                                        alt="password key icon"
                                    />
                                </div>
                            </div>
                            <div
                                style={{ fontFamily: "Pretendard-Regular" }}
                                className="relative"
                            >
                                <input
                                    className="w-[351px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                    id="passwordInput"
                                    name="passwordInput"
                                    type={pwShow ? "text" : "password"}
                                    required
                                    minLength="4"
                                    placeholder="비밀번호를 입력하세요!"
                                    {...register("password", userPassword)}
                                />
                                {errors.password && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.password.message}
                                    </div>
                                )}
                                <div className="absolute right-[10px] top-[7px]">
                                    {pwShow ? (
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                setPwShow(false);
                                            }}
                                            icon={faEye}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                setPwShow(true);
                                            }}
                                            icon={faEyeSlash}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="passwordConfirmWrap flex justify-between mb-5">
                            <div className="w-10 h-10 relative">
                                <div className="w-[35px] h-[35px] left-[7px] top-[2px] absolute">
                                    <img
                                        src="./images/iconPwdDoubleCheck.png"
                                        alt="password double check icon"
                                    />
                                </div>
                            </div>
                            <div
                                style={{ fontFamily: "Pretendard-Regular" }}
                                className="relative"
                            >
                                <input
                                    className="w-[351px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                    type={pwShowConfirm ? "text" : "password"}
                                    id="passwordConfirmInput"
                                    name="passwordConfirmInput"
                                    required
                                    minLength="4"
                                    placeholder="비밀번호를 다시 입력하세요!"
                                    {...register("passwordConfirm", {
                                        validate: (value) => {
                                            return (
                                                value === watch("password") ||
                                                "비밀번호일치안함"
                                            );
                                        },
                                    })}
                                />
                                {errors.passwordConfirm && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.passwordConfirm.message}
                                    </div>
                                )}
                                <div className="absolute right-[10px] top-[7px]">
                                    {pwShowConfirm ? (
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                setPwShowConfirm(false);
                                            }}
                                            icon={faEye}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                setPwShowConfirm(true);
                                            }}
                                            icon={faEyeSlash}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <button
                            style={{ fontFamily: "Pretendard-Regular" }}
                            className="w-[400px] h-10 px-2.5 py-[5px] mb-5 bg-teal-300 rounded-[5px] text-center text-teal-950 justify-center text-[15px] font-normal items-center gap-2.5 inline-flex"
                        >
                            회원가입
                        </button>
                        <div
                            style={{ fontFamily: "Pretendard-Regular" }}
                            className="text-black text-[15px] font-normal flex justify-center items-center"
                        >
                            이미 어까의 회원이라면 바로
                            <a href="/login" className="mx-[6px] underline">
                                로그인!
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
