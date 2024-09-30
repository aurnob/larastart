import { CheckCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

const AlertSuccess = (props) => {
    return (
        <Alert variant="default" className="border-green-500 bg-green-50 text-green-700">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
                {props.message}
            </AlertDescription>
        </Alert>
    )
}
export default AlertSuccess