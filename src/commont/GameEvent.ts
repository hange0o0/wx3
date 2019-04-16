
class GameEvent {
    public static client = {
        COIN_CHANGE:'COIN_CHANGE',
        DIAMOND_CHANGE:'DIAMOND_CHANGE',
        INFO_CHANGE:'INFO_CHANGE',
        CHAPTER_CHANGE:'CHAPTER_CHANGE',
        HISTORY_CHANGE:'HISTORY_CHANGE',
        FIGHT_CHANGE:'FIGHT_CHANGE',
        FIGHT_ATK_CHANGE:'FIGHT_ATK_CHANGE',
        MONSTER_WORK_CHANGE:'MONSTER_WORK_CHANGE',
        MONSTER_CHANGE:'MONSTER_CHANGE',
        TEC_CHANGE:'TEC_CHANGE',
        BUFF_CHANGE:'BUFF_CHANGE',
        DEF_CHANGE:'DEF_CHANGE',
        TASK_CHANGE:'TASK_CHANGE',

        energy_change:'energy_change',
        red_change:'red_change',
        pass_day:'pass_day',
        timer:'timer',
        timerE:'timerE'
    };

    public static sys = {
        login:'login',

        client_error:'sys.client_error'
    }

    public static game = {
        buy_skin:'game.buy_skin',
        create_rank:'rank.create_rank',
        get_rank2:'rank.get_rank2'
    }


    public static rank = {
        get_rank:'rank.get_rank',
        create_rank:'rank.create_rank',
        get_rank2:'rank.get_rank2'
    }


}