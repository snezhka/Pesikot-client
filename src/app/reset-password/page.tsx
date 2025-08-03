import { Suspense } from "react";
import { ResetPasswordForm } from "./_components/resetPasswordForm";

export default function Page() {
    //pass query params to ResetPasswordForm from Page (get from parameters)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}