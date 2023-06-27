exports.getTestTask = function (ctx) {
  return new Promise(function (resolve, reject) {
    const sqlCommand = `SELECT id, change_id FROM ${cfgTableChanges} ORDER BY change_id DESC`; //Если cfgTableChanges используется вместо "public"."doc_changes"
    baseConnector.sqlQuery(ctx, sqlCommand, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//А вот вывод у каждого документа своего id и change_id через уже существующую логику в файле DocsCoServer.js
//Добавить в функцию sendAuthInfo() следующее:
const docId = conn.docId;
const getId = yield * getChangesIndex(ctx, docId);
yield *
  onMessage(ctx, conn, {
    message: docId + " - " + getId,
  });

//А так выглядит полная функция:

function* sendAuthInfo(
  ctx,
  conn,
  bIsRestore,
  participantsMap,
  opt_hasForgotten,
  opt_openedAt
) {
  //1 вариант - у каждого документа показывается отдельно. Еще заметил что getChangesIndex добавляет +1 к количеству изменений в файле - если добавлено 5 букв - index изменится на 6
  const docId = conn.docId;
  const getId = yield* getChangesIndex(ctx, docId);
  yield* onMessage(ctx, conn, {
    message: docId + " - " + getId,
  });
  const getTest = yield* sqlBase.getTestTask(ctx); //Выдается ошибка "You are trying to perform an action you don't have rights to" при попытке вызова новой функции
  let docLock;
  if (EditorTypes.document == conn.editorType) {
    docLock = {};
    let elem;
    const allLocks = yield* getAllLocks(ctx, docId);
    for (let i = 0; i < allLocks.length; ++i) {
      elem = allLocks[i];
      docLock[elem.block] = elem;
    }
  } else {
    docLock = yield* getAllLocks(ctx, docId);
  }
  let allMessages = yield editorData.getMessages(ctx, docId);
  allMessages = allMessages.length > 0 ? allMessages : undefined; //todo client side
  let sessionToken;
  if (cfgTokenEnableBrowser && !bIsRestore) {
    sessionToken = yield fillJwtByConnection(ctx, conn);
  }
  let settings = Object.assign({}, cfgEditor);
  settings["limits_image_size"] = cfgImageSize;
  settings["limits_image_types_upload"] = cfgTypesUpload;
  const sendObject = {
    type: "auth",
    result: 1,
    sessionId: conn.sessionId,
    sessionTimeConnect: conn.sessionTimeConnect,
    participants: participantsMap,
    messages: allMessages,
    locks: docLock,
    indexUser: conn.user.indexUser,
    hasForgotten: opt_hasForgotten,
    jwt: sessionToken,
    g_cAscSpellCheckUrl: cfgEditor["spellcheckerUrl"],
    buildVersion: commonDefines.buildVersion,
    buildNumber: commonDefines.buildNumber,
    licenseType: conn.licenseType,
    settings: settings,
    openedAt: opt_openedAt,
  };
  sendData(ctx, conn, sendObject); //Or 0 if fails
}
