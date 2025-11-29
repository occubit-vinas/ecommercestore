export const validateLoginCredentials = (email: string, password: string) => {
    const errors: { email?: string; password?: string } = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email) {

        if (!emailRegex.test(email)) {
            errors.email = "Invalid email format";
        }
    }
    else {
        errors.email = 'enter email first'
    }

    // Password validation (min 6 chars + special character)
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(password)) {
        errors.password =
            "Password must be at least 6 characters and contain at least 1 special character";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};


export const validateSignupCredentials = (
    name: string,
    email: string,
    password: string
) => {
    const errors: { name?: string, email?: string, password?: string } = {};

    // Name validation
    if (!name || name.trim() === "") {
        errors.name = "Name cannot be empty";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.trim() === "") {
        errors.email = "Email cannot be empty";
    } else if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
    }

    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!password || password.trim() === "") {
        errors.password = "Password cannot be empty";
    } else if (!passwordRegex.test(password)) {
        errors.password =
            "Password must be at least 6 characters and include one special character";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};



