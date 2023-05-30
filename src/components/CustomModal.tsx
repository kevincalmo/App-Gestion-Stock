import {Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";

interface CustomModalProps {
    isOpen: boolean;
    onClose: any;
    children: any;
    title: string;
}

export default function CustomModal({isOpen, onClose, children, title}: CustomModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}