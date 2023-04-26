export interface IPaginate {
  list: Array<any>;
  countPerPage?: number;
  query: object;
  filterException?: Array<string>;
}

export function paginate({
  list,
  countPerPage,
  query,
  filterException,
}: IPaginate) {
  const { page: pg, perPage: pp, partial: pl, ...filter }: any = query;
  const page = Number(pg);
  const perPage = Number(pp);
  const partial = serializerStringType(pl);
  let sumValidation = 0;

  !countPerPage ? (countPerPage = perPage) : null;

  const listFilter = Object.entries(filter);

  let listPaginate = [...list];

  if (listPaginate.length == 0) {
    return {
      nextPage: null,
      currentPage: `page=1`,
      previousPage: null,
      amountPage: 0,
      howManyFetched: 0,
      result: [],
    };
  }

  if (filterException) {
    listFilter.forEach((word, i) => {
      if (filterException.includes(word[0])) {
        listFilter.splice(i, 1);
      }
    });
  }

  if (listFilter.length != 0) {
    listPaginate = list.filter((item) => {
      const valueValid: number = listFilter.length;
      let validationsPassed: number = 0;

      listFilter.forEach((search) => {
        const keys = search[0].split(".");

        const { type: typeValue, result: value } = serializerStringType(
          search[1]
        );
        const isLevelsKeys = keys.length > 1;

        // Verifica se a chave é "min_kms"
        if (keys[0] === "min_kms") {
          // Compara o valor de "item.kms" com o valor de "search[1]"
          if (item.kms >= Number(search[1])) {
            validationsPassed += 1;
            sumValidation += 1;
          }
        }

        // Verifica se a chave é "max_kms"
        if (keys[0] === "max_kms") {
          // Compara o valor de "item.kms" com o valor de "search[1]"
          if (item.kms <= Number(search[1])) {
            validationsPassed += 1;
            sumValidation += 1;
          }
        }

        // Verifica se a chave é "min_price"
        if (keys[0] === "min_price") {
          // Compara o valor de "item.price" com o valor de "search[1]"
          if (Number(item.price) >= Number(search[1])) {
            validationsPassed += 1;
            sumValidation += 1;
          }
        }

        // Verifica se a chave é "max_price"
        if (keys[0] === "max_price") {
          // Compara o valor de "item.price" com o valor de "search[1]"
          if (Number(item.price) <= Number(search[1])) {
            validationsPassed += 1;
            sumValidation += 1;
          }
        }

        if (keys[0] === "year" && search[1] == "2015") {
          // Compara o valor de "item.price" com o valor de "search[1]"
          if (Number(item.year) <= 2015) {
            validationsPassed += 1;
            sumValidation += 1;
          }
        }

        if (isLevelsKeys) {
          const { type: typeKeysTwo, result: keyTwo } = serializerStringType(
            `${item[keys[0]][keys[1]]}`
          );
          const isString = typeKeysTwo == "string" && typeValue == "string";

          if (isString ? `${keyTwo}`.includes(`${value}`) : keyTwo == value) {
            validationsPassed += 1;
            sumValidation += 1;
          }
        } else {
          const { type: typekeyOne, result: keyOne } = serializerStringType(
            `${item[search[0]]}`
          );
          const isString = typekeyOne == "string" && typeValue == "string";

          if (isString ? `${keyOne}`.includes(`${value}`) : keyOne == value) {
            validationsPassed += 1;
            sumValidation += 1;
          }
        }
      });

      if (partial) {
        console.log(validationsPassed);

        return validationsPassed > 0;
      }

      return validationsPassed == valueValid;
    });
  }

  if (page < 1) {
    return {
      nextPage: null,
      currentPage: `page=1`,
      previousPage: null,
      amountPage: 0,
      howManyFetched: 0,
      result: [],
    };
  }

  let newList: Array<Array<any>> = [];

  const count = Math.round(listPaginate.length / countPerPage + 0.49);
  const loopQuanty = count == 0 && listPaginate.length != 0 ? 1 : count;

  for (let i = 1; i <= loopQuanty; i++) {
    console.log(i);

    newList.push(listPaginate.splice(0, countPerPage));
  }

  if (page > newList.length) {
    return {
      nextPage: null,
      currentPage: `page=1`,
      previousPage: null,
      amountPage: 0,
      howManyFetched: 0,
      result: [],
    };
  }

  return {
    nextPage: page + 1 > count ? null : `page=${page + 1}`,
    currentPage: `page=${page}`,
    previousPage: page == 1 ? null : `page=${page - 1}`,
    amountPage: newList.length,
    howManyFetched: list.length,
    result: newList[page - 1],
  };
}

function serializerStringType(query: any) {
  if (query == undefined) {
    return query;
  }

  if (typeof query != "string") {
    return {
      type: "Deve ser uma string",
      result: false,
    };
  }

  const isBoolean =
    query == "true" ? true : query == "false" ? false : undefined;

  if (isBoolean == true || isBoolean == false) {
    return {
      type: "boolean",
      result: isBoolean,
    };
  }

  const isNumber =
    (!query.includes(".") && Number(query)) ||
    (!query.includes(".") && Number(query) == 0)
      ? Number(query)
      : undefined;

  if (typeof isNumber == "number") {
    return {
      type: "number",
      result: isNumber,
    };
  }

  return {
    type: "string",
    result: query.toLowerCase().trim(),
  };
}
