import React , {useState, useEffect, use} from "react";


export default function TicketForm({dispatch, editingTicket}){

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [priority,setPriority] = useState('1');

    useEffect(() => {

        if(editingTicket){
            setTitle(editingTicket.title)
            setDescription(editingTicket.description)
            setPriority(editingTicket.priority)

        } else{
            clearForm();
        }

    }, [editingTicket])

    const priorityLabels = {
        1:'Low',
        2:'Medium',
        3:'High'
    }

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setPriority('1');
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const ticketData = {
            id:editingTicket? editingTicket.id : new Date().toISOString(),
            title,
            description,
            priority,
        };

        dispatch({
            type: editingTicket? "UPDATE_TICKET" :"ADD_TICKET",
            payload: ticketData
        });

        clearForm();
    }

    const handelCancel = () => {

        dispatch({type: "CLEAR_EDITING_TICKET"})
        clearForm();
    }

    return (
        <form onSubmit={handleSubmit} className="ticket-form">
            <div>
                <label>Title</label>
                <input 
                type="text" 
                value ={title} 
                className="form-input" 
                onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Description </label>
                <textarea 
                type="text" 
                value ={description} 
                className="form-input" 
                onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div>
                <fieldset className="priority-fieldset">
                    <legend>Priority</legend>
                    {
                        Object.entries(priorityLabels).map(([value, label]) => (
                        <label 
                        key={value} 
                        className="priority-label">
                            <input 
                            className="priority-input" 
                            type="radio" 
                            value={value} 
                            checked={priority===value}
                            onChange={e => setPriority(e.target.value)}
                            />
                        {label}
                    </label>

                    ))}

                </fieldset>

                {editingTicket && (
                    <button className="button" onClick={handelCancel}>Cancel Edit </button>
                )}

                <button type="submit" className="button">Submit</button>

                
            </div>

        </form>

    );
}