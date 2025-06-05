export function genPagination(params: any) {
  let paginationQuery: any = {};
  let sort = params.sort == 'ASC' ? 1 : -1;
  paginationQuery.page = params.page || 1;
  if (params.count && params.count.toLowerCase() === 'all') {
    paginationQuery.limit = Number.MAX_SAFE_INTEGER;
  } else {
    paginationQuery.limit = params.count || 10;
  }
  paginationQuery.sort = {
    [params.sort_by ? params.sort_by : 'createdAt']: sort,
  };
  return paginationQuery;
}

export function genFilter(filterFields: string[], params: any): any {
  let payload: any = {};

  if (params['filter']) {
    let regexQuery = {
      $regex: '.*' + params['filter'] + '.*',
      $options: 'i',
    };

    payload.$or = filterFields.map((field) => ({ [field]: regexQuery }));
  }

  return payload;
}

export function filterPagination(filterFields, requestData) {
  let payload: any = {
    ...genFilter(filterFields, requestData),
  };

  let paginationQuery: any = genPagination(requestData);
  paginationQuery.select = ['-__v'];
  return { payload: payload, paginationQuery: paginationQuery };
}
