import {Button} from 'react-bootstrap'
import {PlusCircleFill} from 'react-bootstrap-icons'

function IconAdd()
{
    return( 
        <div className="position-fixed bottomIcon">
            <Button type="button" variant="light">
                <PlusCircleFill className="size_3 c_green" />
            </Button>
        </div>
    );
}

export default IconAdd;