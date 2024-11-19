import { translate } from "@utils";

export const ERRORS = {
  "email taken": translate("ERRORS.EMAIL_TAKEN"),
  "logged out": translate("ERRORS.LOGGED_OUT"),
  "team cannot contain email address": translate(
    "ERRORS.TEAM_CANNOT_CONTAIN_EMAIL_ADDRESS"
  ),
  "email doesn't exist": translate("ERRORS.EMAIL_DOES_NOT_EXIST"),
  "annotation name taken": translate("ERRORS.ANNOTATION_NAME_TAKEN"),
  "annotation not found": translate("ERRORS.ANNOTATION_NOT_FOUND"),
  "nomination event does not exist": translate(
    "ERRORS.NOMINATION_EVENT_DOES_NOT_EXIST"
  ),
  "nomination event already exist": translate(
    "ERRORS.NOMINATION_EVENT_ALREADY_EXIST"
  ),
  "tournament started": translate("ERRORS.TOURNAMENT_STARTED"),
  "tournament not started": translate("ERRORS.TOURNAMENT_NOT_STARTED"),
  "participant not in nomination event": translate(
    "ERRORS.PARTICIPANT_NOT_IN_NOMINATION_EVENT"
  ),
  "registration finished": translate("ERRORS.REGISTRATION_FINISHED"),
  "participant already in nomination event": translate(
    "ERRORS.PARTICIPANT_ALREADY_IN_NOMINATION_EVENT"
  ),
  "you are not in judge command": translate(
    "ERRORS.YOU_ARE_NOT_IN_JUDGE_COMMAND"
  ),
  "race round length should be at least 1": translate(
    "ERRORS.RACE_ROUND_LENGTH_SHOULD_BE_AT_LEAST_1"
  ),
  "race tournament finished": translate("ERRORS.RACE_TOURNAMENT_FINISHED"),
  "criterias names has duplicates": translate(
    "ERRORS.CRITERIAS_NAMES_HAS_DUPLICATES"
  ),
  "criteria not found": translate("ERRORS.CRITERIA_NOT_FOUND"),
  "criteria not in nomination event": translate(
    "ERRORS.CRITERIA_NOT_IN_NOMINATION_EVENT"
  ),
  "not all criterias set": translate("ERRORS.NOT_ALL_CRITERIAS_SET"),
  "can not decrypt password": translate("ERRORS.CAN_NOT_DECRYPT_PASSWORD"),
  "equipment not found": translate("ERRORS.EQUIPMENT_NOT_FOUND"),
  "event name taken": translate("ERRORS.EVENT_NAME_TAKEN"),
  "event does not exist": translate("ERRORS.EVENT_DOES_NOT_EXIST"),
  "this event is not yours": translate("ERRORS.THIS_EVENT_IS_NOT_YOURS"),
  "invalid json": translate("ERRORS.INVALID_JSON"),
  "invalid event id": translate("ERRORS.INVALID_EVENT_ID"),
  "invalid file extension": translate("ERRORS.INVALID_FILE_EXTENSION"),
  "file is too large": translate("ERRORS.FILE_IS_TOO_LARGE"),
  "match not related to group": translate("ERRORS.MATCH_NOT_RELATED_TO_GROUP"),
  "match not found": translate("ERRORS.MATCH_NOT_FOUND"),
  "team not related to match": translate("ERRORS.TEAM_NOT_RELATED_TO_MATCH"),
  "prev matches not finished": translate("ERRORS.PREV_MATCHES_NOT_FINISHED"),
  "nomination not found": translate("ERRORS.NOMINATION_NOT_FOUND"),
  "nomination name taken": translate("ERRORS.NOMINATION_NAME_TAKEN"),
  "you cannot delete owner": translate("ERRORS.YOU_CANNOT_DELETE_OWNER"),
  "email taken error": translate("ERRORS.EMAIL_TAKEN_ERROR"),
  "participant does not exist": translate("ERRORS.PARTICIPANT_DOES_NOT_EXIST"),
  "participant does not belongs to owner": translate(
    "ERRORS.PARTICIPANT_DOES_NOT_BELONG_TO_OWNER"
  ),
  "race round not found": translate("ERRORS.RACE_ROUND_NOT_FOUND"),
  "software not found": translate("ERRORS.SOFTWARE_NOT_FOUND"),
  "team name taken": translate("ERRORS.TEAM_NAME_TAKEN"),
  "team not found": translate("ERRORS.TEAM_NOT_FOUND"),
  "this team is not yours": translate("ERRORS.THIS_TEAM_IS_NOT_YOURS"),
  "you cant not name team as default": translate(
    "ERRORS.YOU_CANT_NOT_NAME_TEAM_AS_DEFAULT"
  ),
  "default team is unchangeable": translate(
    "ERRORS.DEFAULT_TEAM_IS_UNCHANGEABLE"
  ),
  "team not in event nomination error": translate(
    "ERRORS.TEAM_NOT_IN_EVENT_NOMINATION_ERROR"
  ),
  "participant already in team": translate(
    "ERRORS.PARTICIPANT_ALREADY_IN_TEAM"
  ),
  "participant not in team": translate("ERRORS.PARTICIPANT_NOT_IN_TEAM"),
  "participant present more then one time": translate(
    "ERRORS.PARTICIPANT_PRESENT_MORE_THAN_ONE_TIME"
  ),
  "Token expired, you are currently logged out": translate(
    "ERRORS.TOKEN_EXPIRED"
  ),
  "Token signature error, invalid token": translate(
    "ERRORS.TOKEN_SIGNATURE_ERROR"
  ),
  "Token does not exist": translate("ERRORS.TOKEN_DOES_NOT_EXIST"),
  "Token is invalid": translate("ERRORS.TOKEN_IS_INVALID"),
  "invalid group count": translate("ERRORS.INVALID_GROUP_COUNT"),
  "not all matches are finished": translate(
    "ERRORS.NOT_ALL_MATCHES_ARE_FINISHED"
  ),
  "group stage is not finished": translate(
    "ERRORS.GROUP_STAGE_IS_NOT_FINISHED"
  ),
  "group stage is finished": translate("ERRORS.GROUP_STAGE_IS_FINISHED"),
  "wrong teams provided": translate("ERRORS.WRONG_TEAMS_PROVIDED"),
  "play off stage already started": translate(
    "ERRORS.PLAY_OFF_STAGE_ALREADY_STARTED"
  ),
  "play off stage already finished": translate(
    "ERRORS.PLAY_OFF_STAGE_ALREADY_FINISHED"
  ),
  "play off stage not started": translate("ERRORS.PLAY_OFF_STAGE_NOT_STARTED"),
  "not all race_rounds_finished": translate(
    "ERRORS.NOT_ALL_RACE_ROUNDS_FINISHED"
  ),
  "criteria stage finished": translate("ERRORS.CRITERIA_STAGE_FINISHED"),
  "invalid password": translate("ERRORS.INVALID_PASSWORD"),
  "user not found": translate("ERRORS.USER_NOT_FOUND"),
  "you are not allowed to perform this action": translate(
    "ERRORS.YOU_ARE_NOT_ALLOWED_TO_PERFORM_THIS_ACTION"
  ),
  "passwords dont match": translate("ERRORS.PASSWORDS_DONT_MATCH"),
  "current password is missed": translate("ERRORS.CURRENT_PASSWORD_IS_MISSED"),
  "one or more judges presented in judges_ids not found": translate(
    "ERRORS.JUDGES_NOT_FOUND"
  ),

  getError: function (errorKey) {
    return this[errorKey] || "Произошла неизвестная ошибка.";
  },
};
