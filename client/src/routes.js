import React from "react";
import {Routes, Route} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage";
import {IndexPage} from "./pages/IndexPage";
import {ContactsPage} from "./pages/ContactsPage";
import {PetsAdminPage} from "./pages/PetsAdminPage";
import {PetsPage} from "./pages/PetsPage";
import {AppealsAdminPage} from "./pages/AppealsAdminPage";
import {RegisterPage} from "./pages/RegisterPage";

export const useRoutes = (auth, setAuth) => {
    if (auth.role === 'Admin') {
        return (
            <Routes>
                <Route path="/pets" element={<PetsPage auth={auth} />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/admin/appeals" element={<AppealsAdminPage setAuth={setAuth} />} />
                <Route path="/admin/*" element={<PetsAdminPage setAuth={setAuth} />} />
                <Route path="*" element={<IndexPage />} />
            </Routes>
        )
    } else if (auth.role === 'User') {
        return (
            <Routes>
                <Route path="/pets" element={<PetsPage auth={auth} />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="*" element={<IndexPage />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path="/pets" element={<PetsPage auth={auth} />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/register" element={<RegisterPage setAuth={setAuth} />} />
                <Route path="/admin/*" element={<AuthPage setAuth={setAuth} />} />
                <Route path="*" element={<IndexPage />} />
            </Routes>
        )
    }
}