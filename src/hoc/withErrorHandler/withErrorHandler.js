import React, { useState, useEffect } from "react"
import Aux from "../Auxi/Auxi"
import Modal from "../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [])

        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        }, err => {
            setError(err);
        })

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        })

        const errorConfirmedHandler = () => {
            setError(null)
        }

        return (
            <Aux>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error && error.message}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler;