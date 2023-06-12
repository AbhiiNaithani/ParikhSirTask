import React, { createContext, useState } from 'react'

export const SelectedDomains = createContext();

export default function Context({ children }) {
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [selectedSubDomains, setSelectedSubDomains] = useState([]);
    return (
        <SelectedDomains.Provider value={{ selectedDomains, setSelectedDomains, selectedSubDomains, setSelectedSubDomains }}>
            {children}
        </SelectedDomains.Provider>
    )
}

