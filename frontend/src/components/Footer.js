import React from 'react';
const date = new Date().getFullYear();
function Footer() {
    return (
        <footer className="footer" >{`© ${date} Mesto Russia by Elizaveta Gasay`}</footer>
    )
}

export default Footer;