/* tslint:disable */
/* eslint-disable */
/**
 * Catfe
 * Le Catfe API Endpoints
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { Cat } from '../models';
/**
 * CatApi - axios parameter creator
 * @export
 */
export const CatApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get all Cats
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllCats: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/cats`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CatApi - functional programming interface
 * @export
 */
export const CatApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CatApiAxiosParamCreator(configuration)
    return {
        /**
         * Get all Cats
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllCats(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Cat>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllCats(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CatApi - factory interface
 * @export
 */
export const CatApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CatApiFp(configuration)
    return {
        /**
         * Get all Cats
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllCats(options?: any): AxiosPromise<Array<Cat>> {
            return localVarFp.getAllCats(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CatApi - object-oriented interface
 * @export
 * @class CatApi
 * @extends {BaseAPI}
 */
export class CatApi extends BaseAPI {
    /**
     * Get all Cats
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CatApi
     */
    public getAllCats(options?: AxiosRequestConfig) {
        return CatApiFp(this.configuration).getAllCats(options).then((request) => request(this.axios, this.basePath));
    }
}