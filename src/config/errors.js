export const checkError = {

    errorFormatting(data) {
        let errorList = [];
        if (data.status_code && data.status_code === 422) {
            if (data.errors) {
                Object.keys(data.errors).forEach(key => {
                    errorList.push(
                        data.errors[key][0]
                    );
                });

            } else {
                errorList.push(data ? data.message : '');
            }
        } else {
            errorList.push(data ? data.message : '');
        }

        return errorList;

    }

} 