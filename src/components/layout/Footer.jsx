function Footer() {
    return (
        <footer>
            <section className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
                <div className="grid-flow-col items-center">
                    Img
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </div>
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    X
                    Youtube
                    Facebook
                </nav>
            </section>
            <div>
                <div className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
                    <div>
                        <p>Copyright © {new Date().getFullYear()} - All right reserved by XenTask Ltd</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
