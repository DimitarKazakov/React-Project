

const AccordionItem = ({
    header,
    children,
    id
}) => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={id}>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="false" aria-controls={`collapse${id}`}>
                {header}
            </button>
            </h2>
            <div id={`collapse${id}`} className="accordion-collapse collapse" aria-labelledby={id} data-bs-parent="#accordionExample">
            <div className="accordion-body">
                {children}
            </div>
            </div>
        </div>
    );
};

export default AccordionItem;