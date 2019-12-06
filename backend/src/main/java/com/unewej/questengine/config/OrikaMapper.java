package com.unewej.questengine.config;

import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrikaMapper extends ConfigurableMapper {
    @Autowired
    OrikaMapper orikaMapper;

    @Override
    protected void configure(MapperFactory factory) {
//        factory.classMap(GameEntity.class, Game.class)
//                .exclude("questions")
//                .exclude("gameStatistic")
//                .customize(new CustomMapper<GameEntity, Game>() {
//                    @Override
//                    public void mapAtoB(GameEntity gameEntity, Game game, MappingContext context) {
//                        game.setQuestions(orikaMapper.mapAsList(gameEntity.getQuestions(), Question.class));
//                    }
//                })
//                .byDefault()
//                .register();
    }
}