import axios from 'axios';

const createParamsString = (searchText, sortBy, pageSize, pageNumber) => {
    const params = [];
    if (searchText) {
        params.push(`title=${encodeURIComponent(searchText)}`);
    }
    if (sortBy) {
        params.push(`DIR=${encodeURIComponent(sortBy)}`);
    }
    if (pageSize) {
        params.push(`pageSize=${encodeURIComponent(pageSize)}`);
    }
    if (pageNumber) {
        params.push(`page=${encodeURIComponent(pageNumber)}`);
    }
    if (params.length === 0) {
        return '';
    }
    return `?${params.join('&')}`;
};

export const getBooksList = async (searchText, sortBy, pageSize, pageNumber) => {
    const params = createParamsString(searchText, sortBy, pageSize, pageNumber);
    try {
        return await axios.get(`http://64.227.142.191:8080/application-test-v1.1/books/${params ? params : ''}`);
    } catch (error) {
        console.error('Error while fetching books', error);
    }
}

export const registerBookData = async (data) => {
    try {
        return await axios.post('http://64.227.142.191:8080/application-test-v1.1/books', data);
    } catch (error) {
        console.error('Error while registering book data', error);
    }
}

export const editBookData = async (id, data) => {
    try {
        return await axios.put(`http://64.227.142.191:8080/application-test-v1.1/books/${id}`, data);
    } catch (error) {
        console.error('Error while editing book data', error);
    }
}