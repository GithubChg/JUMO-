import React, {useState} from 'react';
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Close from "@mui/icons-material/Close";
import "./MenuModal.css";

function MenuModal({name, price, detail, src, allergy}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className="imageBtn" onClick={handleOpen}></div>
            <Modal open={open} onClose={handleClose}>
                <div className="modal">
                    <Stack spacing={1}>
                        <Close style={{position: 'absolute', right: 20, cursor: 'pointer'}} onClick={handleClose} title="닫기" />
                        <Stack direction="row" spacing={2}>
                            <img className="img" src={src} alt="메뉴 이미지" />
                            <Stack>
                                <div className="name">
                                    {name}
                                </div>
                                <div className="price">
                                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                                </div>
                                <div className="detail">
                                    {detail}
                                </div>
                                <div className="detail" style={{color: 'red', fontSize: '13px'}}>
                                    {"*"+allergy}
                                </div>
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
            </Modal>
        </>
    );
}

export default MenuModal;