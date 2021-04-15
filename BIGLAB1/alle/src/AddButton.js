import 'bootstrap/dist/css/bootstrap.css';
import { 
    PlusCircleFill, 
} from 'react-bootstrap-icons';

function AddBtn() {
    return (
        <PlusCircleFill size={48} className="bottom-right m-3 add-btn" />
    );
}

export default AddBtn;