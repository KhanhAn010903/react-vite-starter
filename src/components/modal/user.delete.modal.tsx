import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { deleteUserById, resetDelete } from '../../redux/user/user.slice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const UserDeleteModal = (props: any) => {
    const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;
    const dispatch = useAppDispatch();
    const isDeleteSuccess = useAppSelector(state => state.user.isDeleteSuccess)
    const handleSubmit = () => {
        dispatch(deleteUserById({ id: dataUser?.id ?? "" }))
    }
    useEffect(() => {
        if (isDeleteSuccess === true) {
            setIsOpenDeleteModal(false)
            toast('Wow so easy! Delete succeed')
            dispatch(resetDelete())
        }
    }, [isDeleteSuccess])

    return (
        <Modal
            show={isOpenDeleteModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            onHide={() => setIsOpenDeleteModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete A User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the user: {dataUser?.email ?? ""}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='warning'
                    onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                <Button onClick={() => handleSubmit()}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserDeleteModal;