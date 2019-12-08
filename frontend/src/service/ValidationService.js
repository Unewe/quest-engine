
export let validateLength = (minLength, maxLength) => {
    return (value) => {
        console.log(value, minLength, maxLength)
        if(value.length < minLength) {
            return {
                status: 'error',
                message: `Введите более ${minLength} символов.)`,
            }
        } else if (value.length > maxLength) {
            return {
                status: 'error',
                message: `Строка превышает ${maxLength} символов.)`
            }
        } else {
            return {
                status: 'success',
                message: null,
                conclusion: 'success'
            };
        }
    }
};

export let validateEmail = (email) => {
    if(!email) {
        return {
            status: 'error',
            message: 'Введите значение.'
        }
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if(!EMAIL_REGEX.test(email)) {
        return {
            status: 'error',
            message: 'Значение не похоже на email аддрес.'
        }
    }

    return {
        status: 'success',
        message: null,
        conclusion: 'success'
    }
}

export let validatePassword = (previous) => {
    return (current) => {
        if(previous === current) {
            return {
                status: 'success',
                message: null,
                conclusion: 'success'
            }
        } else {
            return {
                status: 'error',
                message: 'Пароли не совпадают.'
            }
        }
    }
}