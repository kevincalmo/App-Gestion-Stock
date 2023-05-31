import {Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";

interface CustomModalProps {
    isOpen: boolean;
    onClose: any;
    children: any;
    title: string;
    size?:string;
}

export default function CustomModal({isOpen, onClose, children, title, size = "lg"}: CustomModalProps) {
    return (
        <Modal isOpen={isOpen} size={size} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false}>
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