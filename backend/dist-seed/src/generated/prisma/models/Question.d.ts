import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuestionModel = runtime.Types.Result.DefaultSelection<Prisma.$QuestionPayload>;
export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null;
    _avg: QuestionAvgAggregateOutputType | null;
    _sum: QuestionSumAggregateOutputType | null;
    _min: QuestionMinAggregateOutputType | null;
    _max: QuestionMaxAggregateOutputType | null;
};
export type QuestionAvgAggregateOutputType = {
    id: number | null;
    categoryId: number | null;
};
export type QuestionSumAggregateOutputType = {
    id: number | null;
    categoryId: number | null;
};
export type QuestionMinAggregateOutputType = {
    id: number | null;
    hash: string | null;
    text: string | null;
    type: $Enums.QuestionType | null;
    difficulty: $Enums.Difficulty | null;
    categoryId: number | null;
};
export type QuestionMaxAggregateOutputType = {
    id: number | null;
    hash: string | null;
    text: string | null;
    type: $Enums.QuestionType | null;
    difficulty: $Enums.Difficulty | null;
    categoryId: number | null;
};
export type QuestionCountAggregateOutputType = {
    id: number;
    hash: number;
    text: number;
    type: number;
    difficulty: number;
    categoryId: number;
    _all: number;
};
export type QuestionAvgAggregateInputType = {
    id?: true;
    categoryId?: true;
};
export type QuestionSumAggregateInputType = {
    id?: true;
    categoryId?: true;
};
export type QuestionMinAggregateInputType = {
    id?: true;
    hash?: true;
    text?: true;
    type?: true;
    difficulty?: true;
    categoryId?: true;
};
export type QuestionMaxAggregateInputType = {
    id?: true;
    hash?: true;
    text?: true;
    type?: true;
    difficulty?: true;
    categoryId?: true;
};
export type QuestionCountAggregateInputType = {
    id?: true;
    hash?: true;
    text?: true;
    type?: true;
    difficulty?: true;
    categoryId?: true;
    _all?: true;
};
export type QuestionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuestionCountAggregateInputType;
    _avg?: QuestionAvgAggregateInputType;
    _sum?: QuestionSumAggregateInputType;
    _min?: QuestionMinAggregateInputType;
    _max?: QuestionMaxAggregateInputType;
};
export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
    [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuestion[P]> : Prisma.GetScalarType<T[P], AggregateQuestion[P]>;
};
export type QuestionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithAggregationInput | Prisma.QuestionOrderByWithAggregationInput[];
    by: Prisma.QuestionScalarFieldEnum[] | Prisma.QuestionScalarFieldEnum;
    having?: Prisma.QuestionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuestionCountAggregateInputType | true;
    _avg?: QuestionAvgAggregateInputType;
    _sum?: QuestionSumAggregateInputType;
    _min?: QuestionMinAggregateInputType;
    _max?: QuestionMaxAggregateInputType;
};
export type QuestionGroupByOutputType = {
    id: number;
    hash: string;
    text: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
    categoryId: number;
    _count: QuestionCountAggregateOutputType | null;
    _avg: QuestionAvgAggregateOutputType | null;
    _sum: QuestionSumAggregateOutputType | null;
    _min: QuestionMinAggregateOutputType | null;
    _max: QuestionMaxAggregateOutputType | null;
};
export type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuestionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuestionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuestionGroupByOutputType[P]>;
}>>;
export type QuestionWhereInput = {
    AND?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    OR?: Prisma.QuestionWhereInput[];
    NOT?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    id?: Prisma.IntFilter<"Question"> | number;
    hash?: Prisma.StringFilter<"Question"> | string;
    text?: Prisma.StringFilter<"Question"> | string;
    type?: Prisma.EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFilter<"Question"> | $Enums.Difficulty;
    categoryId?: Prisma.IntFilter<"Question"> | number;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    answers?: Prisma.AnswerListRelationFilter;
    quizzes?: Prisma.QuizQuestionListRelationFilter;
};
export type QuestionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    difficulty?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    category?: Prisma.CategoryOrderByWithRelationInput;
    answers?: Prisma.AnswerOrderByRelationAggregateInput;
    quizzes?: Prisma.QuizQuestionOrderByRelationAggregateInput;
};
export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    hash?: string;
    AND?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    OR?: Prisma.QuestionWhereInput[];
    NOT?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    text?: Prisma.StringFilter<"Question"> | string;
    type?: Prisma.EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFilter<"Question"> | $Enums.Difficulty;
    categoryId?: Prisma.IntFilter<"Question"> | number;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    answers?: Prisma.AnswerListRelationFilter;
    quizzes?: Prisma.QuizQuestionListRelationFilter;
}, "id" | "hash">;
export type QuestionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    difficulty?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    _count?: Prisma.QuestionCountOrderByAggregateInput;
    _avg?: Prisma.QuestionAvgOrderByAggregateInput;
    _max?: Prisma.QuestionMaxOrderByAggregateInput;
    _min?: Prisma.QuestionMinOrderByAggregateInput;
    _sum?: Prisma.QuestionSumOrderByAggregateInput;
};
export type QuestionScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuestionScalarWhereWithAggregatesInput | Prisma.QuestionScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuestionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuestionScalarWhereWithAggregatesInput | Prisma.QuestionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Question"> | number;
    hash?: Prisma.StringWithAggregatesFilter<"Question"> | string;
    text?: Prisma.StringWithAggregatesFilter<"Question"> | string;
    type?: Prisma.EnumQuestionTypeWithAggregatesFilter<"Question"> | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyWithAggregatesFilter<"Question"> | $Enums.Difficulty;
    categoryId?: Prisma.IntWithAggregatesFilter<"Question"> | number;
};
export type QuestionCreateInput = {
    hash: string;
    text?: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
    category: Prisma.CategoryCreateNestedOneWithoutQuestionsInput;
    answers?: Prisma.AnswerCreateNestedManyWithoutQuestionInput;
    quizzes?: Prisma.QuizQuestionCreateNestedManyWithoutQuestionInput;
};
export type QuestionUncheckedCreateInput = {
    id?: number;
    hash: string;
    text?: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
    categoryId: number;
    answers?: Prisma.AnswerUncheckedCreateNestedManyWithoutQuestionInput;
    quizzes?: Prisma.QuizQuestionUncheckedCreateNestedManyWithoutQuestionInput;
};
export type QuestionUpdateInput = {
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    category?: Prisma.CategoryUpdateOneRequiredWithoutQuestionsNestedInput;
    answers?: Prisma.AnswerUpdateManyWithoutQuestionNestedInput;
    quizzes?: Prisma.QuizQuestionUpdateManyWithoutQuestionNestedInput;
};
export type QuestionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    answers?: Prisma.AnswerUncheckedUpdateManyWithoutQuestionNestedInput;
    quizzes?: Prisma.QuizQuestionUncheckedUpdateManyWithoutQuestionNestedInput;
};
export type QuestionCreateManyInput = {
    id?: number;
    hash: string;
    text?: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
    categoryId: number;
};
export type QuestionUpdateManyMutationInput = {
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
};
export type QuestionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuestionListRelationFilter = {
    every?: Prisma.QuestionWhereInput;
    some?: Prisma.QuestionWhereInput;
    none?: Prisma.QuestionWhereInput;
};
export type QuestionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuestionScalarRelationFilter = {
    is?: Prisma.QuestionWhereInput;
    isNot?: Prisma.QuestionWhereInput;
};
export type QuestionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    difficulty?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type QuestionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type QuestionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    difficulty?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type QuestionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    difficulty?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type QuestionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type QuestionCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutCategoryInput, Prisma.QuestionUncheckedCreateWithoutCategoryInput> | Prisma.QuestionCreateWithoutCategoryInput[] | Prisma.QuestionUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutCategoryInput | Prisma.QuestionCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.QuestionCreateManyCategoryInputEnvelope;
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
};
export type QuestionUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutCategoryInput, Prisma.QuestionUncheckedCreateWithoutCategoryInput> | Prisma.QuestionCreateWithoutCategoryInput[] | Prisma.QuestionUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutCategoryInput | Prisma.QuestionCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.QuestionCreateManyCategoryInputEnvelope;
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
};
export type QuestionUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutCategoryInput, Prisma.QuestionUncheckedCreateWithoutCategoryInput> | Prisma.QuestionCreateWithoutCategoryInput[] | Prisma.QuestionUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutCategoryInput | Prisma.QuestionCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.QuestionUpsertWithWhereUniqueWithoutCategoryInput | Prisma.QuestionUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.QuestionCreateManyCategoryInputEnvelope;
    set?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    disconnect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    delete?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    update?: Prisma.QuestionUpdateWithWhereUniqueWithoutCategoryInput | Prisma.QuestionUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.QuestionUpdateManyWithWhereWithoutCategoryInput | Prisma.QuestionUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
};
export type QuestionUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutCategoryInput, Prisma.QuestionUncheckedCreateWithoutCategoryInput> | Prisma.QuestionCreateWithoutCategoryInput[] | Prisma.QuestionUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutCategoryInput | Prisma.QuestionCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.QuestionUpsertWithWhereUniqueWithoutCategoryInput | Prisma.QuestionUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.QuestionCreateManyCategoryInputEnvelope;
    set?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    disconnect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    delete?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    connect?: Prisma.QuestionWhereUniqueInput | Prisma.QuestionWhereUniqueInput[];
    update?: Prisma.QuestionUpdateWithWhereUniqueWithoutCategoryInput | Prisma.QuestionUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.QuestionUpdateManyWithWhereWithoutCategoryInput | Prisma.QuestionUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
};
export type QuestionCreateNestedOneWithoutQuizzesInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutQuizzesInput, Prisma.QuestionUncheckedCreateWithoutQuizzesInput>;
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutQuizzesInput;
    connect?: Prisma.QuestionWhereUniqueInput;
};
export type QuestionUpdateOneRequiredWithoutQuizzesNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutQuizzesInput, Prisma.QuestionUncheckedCreateWithoutQuizzesInput>;
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutQuizzesInput;
    upsert?: Prisma.QuestionUpsertWithoutQuizzesInput;
    connect?: Prisma.QuestionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuestionUpdateToOneWithWhereWithoutQuizzesInput, Prisma.QuestionUpdateWithoutQuizzesInput>, Prisma.QuestionUncheckedUpdateWithoutQuizzesInput>;
};
export type EnumQuestionTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionType;
};
export type QuestionCreateNestedOneWithoutAnswersInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutAnswersInput, Prisma.QuestionUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutAnswersInput;
    connect?: Prisma.QuestionWhereUniqueInput;
};
export type QuestionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionCreateWithoutAnswersInput, Prisma.QuestionUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutAnswersInput;
    upsert?: Prisma.QuestionUpsertWithoutAnswersInput;
    connect?: Prisma.QuestionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuestionUpdateToOneWithWhereWithoutAnswersInput, Prisma.QuestionUpdateWithoutAnswersInput>, Prisma.QuestionUncheckedUpdateWithoutAnswersInput>;
};
export type QuestionCreateWithoutCategoryInput = {
    hash: string;
    text?: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
    answers?: Prisma.AnswerCreateNestedManyWithoutQuestionInput;
    quizzes?: Prisma.QuizQuestionCreateNestedManyWithoutQuestionInput;
};
export type QuestionUncheckedCreateWithoutCategoryInput = {
    id?: number;
    hash: string;
    text?: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
    answers?: Prisma.AnswerUncheckedCreateNestedManyWithoutQuestionInput;
    quizzes?: Prisma.QuizQuestionUncheckedCreateNestedManyWithoutQuestionInput;
};
export type QuestionCreateOrConnectWithoutCategoryInput = {
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutCategoryInput, Prisma.QuestionUncheckedCreateWithoutCategoryInput>;
};
export type QuestionCreateManyCategoryInputEnvelope = {
    data: Prisma.QuestionCreateManyCategoryInput | Prisma.QuestionCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type QuestionUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.QuestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuestionUpdateWithoutCategoryInput, Prisma.QuestionUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutCategoryInput, Prisma.QuestionUncheckedCreateWithoutCategoryInput>;
};
export type QuestionUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.QuestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuestionUpdateWithoutCategoryInput, Prisma.QuestionUncheckedUpdateWithoutCategoryInput>;
};
export type QuestionUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.QuestionScalarWhereInput;
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyWithoutCategoryInput>;
};
export type QuestionScalarWhereInput = {
    AND?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
    OR?: Prisma.QuestionScalarWhereInput[];
    NOT?: Prisma.QuestionScalarWhereInput | Prisma.QuestionScalarWhereInput[];
    id?: Prisma.IntFilter<"Question"> | number;
    hash?: Prisma.StringFilter<"Question"> | string;
    text?: Prisma.StringFilter<"Question"> | string;
    type?: Prisma.EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFilter<"Question"> | $Enums.Difficulty;
    categoryId?: Prisma.IntFilter<"Question"> | number;
};
export type QuestionCreateWithoutQuizzesInput = {
    hash: string;
    text?: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
    category: Prisma.CategoryCreateNestedOneWithoutQuestionsInput;
    answers?: Prisma.AnswerCreateNestedManyWithoutQuestionInput;
};
export type QuestionUncheckedCreateWithoutQuizzesInput = {
    id?: number;
    hash: string;
    text?: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
    categoryId: number;
    answers?: Prisma.AnswerUncheckedCreateNestedManyWithoutQuestionInput;
};
export type QuestionCreateOrConnectWithoutQuizzesInput = {
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutQuizzesInput, Prisma.QuestionUncheckedCreateWithoutQuizzesInput>;
};
export type QuestionUpsertWithoutQuizzesInput = {
    update: Prisma.XOR<Prisma.QuestionUpdateWithoutQuizzesInput, Prisma.QuestionUncheckedUpdateWithoutQuizzesInput>;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutQuizzesInput, Prisma.QuestionUncheckedCreateWithoutQuizzesInput>;
    where?: Prisma.QuestionWhereInput;
};
export type QuestionUpdateToOneWithWhereWithoutQuizzesInput = {
    where?: Prisma.QuestionWhereInput;
    data: Prisma.XOR<Prisma.QuestionUpdateWithoutQuizzesInput, Prisma.QuestionUncheckedUpdateWithoutQuizzesInput>;
};
export type QuestionUpdateWithoutQuizzesInput = {
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    category?: Prisma.CategoryUpdateOneRequiredWithoutQuestionsNestedInput;
    answers?: Prisma.AnswerUpdateManyWithoutQuestionNestedInput;
};
export type QuestionUncheckedUpdateWithoutQuizzesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    answers?: Prisma.AnswerUncheckedUpdateManyWithoutQuestionNestedInput;
};
export type QuestionCreateWithoutAnswersInput = {
    hash: string;
    text?: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
    category: Prisma.CategoryCreateNestedOneWithoutQuestionsInput;
    quizzes?: Prisma.QuizQuestionCreateNestedManyWithoutQuestionInput;
};
export type QuestionUncheckedCreateWithoutAnswersInput = {
    id?: number;
    hash: string;
    text?: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
    categoryId: number;
    quizzes?: Prisma.QuizQuestionUncheckedCreateNestedManyWithoutQuestionInput;
};
export type QuestionCreateOrConnectWithoutAnswersInput = {
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutAnswersInput, Prisma.QuestionUncheckedCreateWithoutAnswersInput>;
};
export type QuestionUpsertWithoutAnswersInput = {
    update: Prisma.XOR<Prisma.QuestionUpdateWithoutAnswersInput, Prisma.QuestionUncheckedUpdateWithoutAnswersInput>;
    create: Prisma.XOR<Prisma.QuestionCreateWithoutAnswersInput, Prisma.QuestionUncheckedCreateWithoutAnswersInput>;
    where?: Prisma.QuestionWhereInput;
};
export type QuestionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: Prisma.QuestionWhereInput;
    data: Prisma.XOR<Prisma.QuestionUpdateWithoutAnswersInput, Prisma.QuestionUncheckedUpdateWithoutAnswersInput>;
};
export type QuestionUpdateWithoutAnswersInput = {
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    category?: Prisma.CategoryUpdateOneRequiredWithoutQuestionsNestedInput;
    quizzes?: Prisma.QuizQuestionUpdateManyWithoutQuestionNestedInput;
};
export type QuestionUncheckedUpdateWithoutAnswersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    quizzes?: Prisma.QuizQuestionUncheckedUpdateManyWithoutQuestionNestedInput;
};
export type QuestionCreateManyCategoryInput = {
    id?: number;
    hash: string;
    text?: string;
    type: $Enums.QuestionType;
    difficulty: $Enums.Difficulty;
};
export type QuestionUpdateWithoutCategoryInput = {
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    answers?: Prisma.AnswerUpdateManyWithoutQuestionNestedInput;
    quizzes?: Prisma.QuizQuestionUpdateManyWithoutQuestionNestedInput;
};
export type QuestionUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    answers?: Prisma.AnswerUncheckedUpdateManyWithoutQuestionNestedInput;
    quizzes?: Prisma.QuizQuestionUncheckedUpdateManyWithoutQuestionNestedInput;
};
export type QuestionUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
};
export type QuestionCountOutputType = {
    answers: number;
    quizzes: number;
};
export type QuestionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    answers?: boolean | QuestionCountOutputTypeCountAnswersArgs;
    quizzes?: boolean | QuestionCountOutputTypeCountQuizzesArgs;
};
export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionCountOutputTypeSelect<ExtArgs> | null;
};
export type QuestionCountOutputTypeCountAnswersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnswerWhereInput;
};
export type QuestionCountOutputTypeCountQuizzesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuizQuestionWhereInput;
};
export type QuestionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hash?: boolean;
    text?: boolean;
    type?: boolean;
    difficulty?: boolean;
    categoryId?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    answers?: boolean | Prisma.Question$answersArgs<ExtArgs>;
    quizzes?: boolean | Prisma.Question$quizzesArgs<ExtArgs>;
    _count?: boolean | Prisma.QuestionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hash?: boolean;
    text?: boolean;
    type?: boolean;
    difficulty?: boolean;
    categoryId?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hash?: boolean;
    text?: boolean;
    type?: boolean;
    difficulty?: boolean;
    categoryId?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectScalar = {
    id?: boolean;
    hash?: boolean;
    text?: boolean;
    type?: boolean;
    difficulty?: boolean;
    categoryId?: boolean;
};
export type QuestionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hash" | "text" | "type" | "difficulty" | "categoryId", ExtArgs["result"]["question"]>;
export type QuestionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    answers?: boolean | Prisma.Question$answersArgs<ExtArgs>;
    quizzes?: boolean | Prisma.Question$quizzesArgs<ExtArgs>;
    _count?: boolean | Prisma.QuestionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type QuestionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type QuestionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $QuestionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Question";
    objects: {
        category: Prisma.$CategoryPayload<ExtArgs>;
        answers: Prisma.$AnswerPayload<ExtArgs>[];
        quizzes: Prisma.$QuizQuestionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        hash: string;
        text: string;
        type: $Enums.QuestionType;
        difficulty: $Enums.Difficulty;
        categoryId: number;
    }, ExtArgs["result"]["question"]>;
    composites: {};
};
export type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuestionPayload, S>;
export type QuestionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuestionCountAggregateInputType | true;
};
export interface QuestionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Question'];
        meta: {
            name: 'Question';
        };
    };
    findUnique<T extends QuestionFindUniqueArgs>(args: Prisma.SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuestionFindFirstArgs>(args?: Prisma.SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuestionFindManyArgs>(args?: Prisma.SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuestionCreateArgs>(args: Prisma.SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuestionCreateManyArgs>(args?: Prisma.SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuestionDeleteArgs>(args: Prisma.SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuestionUpdateArgs>(args: Prisma.SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuestionDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuestionUpdateManyArgs>(args: Prisma.SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuestionUpsertArgs>(args: Prisma.SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuestionCountArgs>(args?: Prisma.Subset<T, QuestionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuestionCountAggregateOutputType> : number>;
    aggregate<T extends QuestionAggregateArgs>(args: Prisma.Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>;
    groupBy<T extends QuestionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuestionGroupByArgs['orderBy'];
    } : {
        orderBy?: QuestionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuestionFieldRefs;
}
export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    answers<T extends Prisma.Question$answersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Question$answersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    quizzes<T extends Prisma.Question$quizzesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Question$quizzesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuestionFieldRefs {
    readonly id: Prisma.FieldRef<"Question", 'Int'>;
    readonly hash: Prisma.FieldRef<"Question", 'String'>;
    readonly text: Prisma.FieldRef<"Question", 'String'>;
    readonly type: Prisma.FieldRef<"Question", 'QuestionType'>;
    readonly difficulty: Prisma.FieldRef<"Question", 'Difficulty'>;
    readonly categoryId: Prisma.FieldRef<"Question", 'Int'>;
}
export type QuestionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionCreateInput, Prisma.QuestionUncheckedCreateInput>;
};
export type QuestionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuestionCreateManyInput | Prisma.QuestionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    data: Prisma.QuestionCreateManyInput | Prisma.QuestionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuestionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuestionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionUpdateInput, Prisma.QuestionUncheckedUpdateInput>;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionWhereInput;
    limit?: number;
};
export type QuestionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionWhereInput;
    limit?: number;
    include?: Prisma.QuestionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuestionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateInput, Prisma.QuestionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuestionUpdateInput, Prisma.QuestionUncheckedUpdateInput>;
};
export type QuestionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    limit?: number;
};
export type Question$answersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnswerSelect<ExtArgs> | null;
    omit?: Prisma.AnswerOmit<ExtArgs> | null;
    include?: Prisma.AnswerInclude<ExtArgs> | null;
    where?: Prisma.AnswerWhereInput;
    orderBy?: Prisma.AnswerOrderByWithRelationInput | Prisma.AnswerOrderByWithRelationInput[];
    cursor?: Prisma.AnswerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnswerScalarFieldEnum | Prisma.AnswerScalarFieldEnum[];
};
export type Question$quizzesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    where?: Prisma.QuizQuestionWhereInput;
    orderBy?: Prisma.QuizQuestionOrderByWithRelationInput | Prisma.QuizQuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuizQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuizQuestionScalarFieldEnum | Prisma.QuizQuestionScalarFieldEnum[];
};
export type QuestionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
};
